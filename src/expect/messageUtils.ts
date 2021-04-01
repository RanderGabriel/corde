import assert from "assert";
import { Message, MessageEmbed, PartialMessage } from "discord.js";
import {
  MessageIdentifier,
  MessageEmbedLike,
  messageType,
  MinifiedEmbedMessage,
  Primitive,
  MessageEditedIdentifier,
} from "../types";
import { pick } from "../utils/pick";
import { isPrimitiveValue } from "../utils/isPrimitiveValue";
import { typeOf } from "../utils";

class MessageUtils {
  messagesMatches(
    returnedMessage: Message | PartialMessage,
    expectation: Primitive | MessageEmbed,
  ) {
    let msg = "";
    if (isPrimitiveValue(expectation)) {
      const formattedMsg = this.getMessageByType(returnedMessage, "text") as Message;
      msg = formattedMsg.content;
      return msg == expectation;
    }

    const jsonMessage = this.getMessageByType(returnedMessage, "embed") as MinifiedEmbedMessage;
    msg = JSON.stringify(jsonMessage);
    let result = true;
    try {
      assert.deepStrictEqual(expectation.toJSON(), jsonMessage);
    } catch (error) {
      result = false;
    }
    return result;
  }

  /**
   * Format Discord responses
   *
   * @param answer Discord response for a message sent
   *
   * @param type Type expected of that message
   *
   * @description Discord adds some attributes that are not present in embed message before it is sent
   *
   *  This is data **before** send to Discord
   *
   *  ```javascript
   *   "image": {
   *       "url": "https://i.imgur.com/wSTFkRM.png"
   *   },
   *   "thumbnail": {
   *       "url": "https://i.imgur.com/wSTFkRM.png"
   *   }
   *  ```
   *
   *  And this is part of embed message **after** get from Discord
   *
   *  ```javascript
   *   "image": {
   *     "height": 0,
   *     "proxyURL": "https://images-ext-2.discordapp.net/external/DoAGN014Q46B7iDBr2VJyHUL59QLSWdEAZ5wOoWe8CY/https/i.imgur.com/wSTFkRM.png",
   *     "url": "https://i.imgur.com/wSTFkRM.png",
   *     "width": 0
   *   },
   *   "thumbnail": {
   *       "height": 0,
   *       "proxyURL": "https://images-ext-2.discordapp.net/external/DoAGN014Q46B7iDBr2VJyHUL59QLSWdEAZ5wOoWe8CY/https/i.imgur.com/wSTFkRM.png",
   *       "url": "https://i.imgur.com/wSTFkRM.png",
   *      "width": 0
   *  }
   *  ```
   */
  getMessageByType(answer: Message | MessageEmbed | PartialMessage, type: messageType) {
    if (type === "embed") {
      const embed = answer instanceof Message ? answer.embeds[0] : answer;
      if (!embed) {
        return null;
      }

      const tempObject = embed.toJSON() as MinifiedEmbedMessage;
      if (tempObject.image) {
        tempObject.image = pick(tempObject.image, "url");
      }
      if (tempObject.thumbnail) {
        tempObject.thumbnail = pick(tempObject.thumbnail, "url");
      }
      return tempObject;
    } else {
      return answer;
    }
  }

  humanizeMessageIdentifierObject(msgIdentifier: MessageIdentifier | MessageEditedIdentifier) {
    if (!msgIdentifier) {
      return "";
    }

    if (msgIdentifier?.id) {
      return `message of id ${msgIdentifier.id}`;
    }

    if ((msgIdentifier as MessageIdentifier).content) {
      return `message of content "${(msgIdentifier as MessageIdentifier).content}"`;
    }

    if ((msgIdentifier as MessageEditedIdentifier).oldContent) {
      return `message of content "${(msgIdentifier as MessageEditedIdentifier).oldContent}"`;
    }

    return "";
  }

  createNotFoundMessageForMessageData(msgIdentifier: MessageIdentifier): string | null {
    if (!msgIdentifier) {
      return null;
    }

    if (msgIdentifier.id && msgIdentifier.content) {
      return `Message with id ${msgIdentifier.id} or content '${msgIdentifier.content}' not found.`;
    }

    if (msgIdentifier.id) {
      return `Message with id ${msgIdentifier.id} not found.`;
    }

    if (msgIdentifier.content) {
      return `Message with content '${msgIdentifier.content}' not found.`;
    }

    return null;
  }

  embedMessageLikeToMessageEmbed(embedLike: MessageEmbedLike) {
    const embed = new MessageEmbed();
    if (!embedLike || typeOf(embedLike) !== "object") {
      return embed;
    }

    if (embedLike.author) {
      if (typeof embedLike.author === "string") {
        embed.setAuthor(embedLike.author);
      } else {
        embed.setAuthor(embedLike.author.name, embedLike.author.iconURL, embedLike.author.url);
      }
    }

    if (embedLike.color) {
      embed.setColor(embedLike.color);
    }

    if (embedLike.description) {
      embed.setDescription(embedLike.description);
    }

    if (embedLike.fields) {
      embed.addFields(...embedLike.fields);
    }

    if (embedLike.files) {
      embed.attachFiles(embedLike.files);
    }

    if (embedLike.footer) {
      if (typeof embedLike.footer === "string") {
        embed.setFooter(embedLike.footer);
      } else {
        embed.setFooter(embedLike.footer.text, embedLike.footer.iconURL);
      }
    }

    if (embedLike.image) {
      if (typeof embedLike.image === "string") {
        embed.setImage(embedLike.image);
      } else {
        embed.setImage(embedLike.image.url);
      }
    }

    if (embedLike.thumbnailUrl) {
      embed.setThumbnail(embedLike.thumbnailUrl);
    }

    if (embedLike.timestamp) {
      embed.setTimestamp(embedLike.timestamp);
    }

    if (embedLike.title) {
      embed.setTitle(embedLike.title);
    }

    if (embedLike.url) {
      embed.setURL(embedLike.url);
    }

    return embed;
  }
}

/**
 * @internal
 */
const messageUtils = new MessageUtils();
export default messageUtils;