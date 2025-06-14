
# aoi.MongoDB

A Mongo DB connecting package for AoiJS without conflicting with AoiDB!

<hr />

## Table Of Contents

- [Installation](#installation)
- [Index Setup](#index-setup)
- [Variables File](#variables-file)
- [Functions](#functions)
  - [AOI Based](#functions)
  - [Specific to this package](#add-on-functions)
    - [`$mongoArray`](#mongoarray)
    - [`$mongoPing`](#mongoping)
    - [`$deleteUserVar`](#deleteuservar)
    - [`$deleteGuildVar`](#deleteguildvar)
    - [`$deleteMessageVar`](#deletemessagevar)
    - [`$deleteChannelVar`](#deletechannelvar)
    - [`$deleteGlobalUserVar`](#deleteglobaluservar)
- [Discord JS Usage](#discordjs-usage)

<hr />

## Installation

```
npm install @aoijs/aoi.mongo
```

## Index Setup

```js
const aoimongo = require("aoi.mongodb");
const { AoiClient } = require("aoi.js");

// AOI setup
const client = new AoiClient({
    token: "DISCORD BOT TOKEN",
    prefix: "DISCORD BOT PREFIX",
    intents: ["MessageContent", "Guilds", "GuildMessages"],
    events: ["onMessage", "onInteractionCreate"],
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "a-32-characters-long-string-here"
    }
});

client.loadCommands("./commands/", true);

// aoi.MongoDB setup
aoimongo.setup({
    client: client,
    mongoURL: "MONGO URL", // Like - "mongodb+srv://..."
    variables: require("Path to Variable File") // You MUST initialize a file with variables and require() it here. Like - require("./var.js") if var.js is the variables file name
});
```

## Variables File

```js
module.exports = {
    num: 0, // Number
    ar: [], // Array
    ob: {}, // Object
    st: "Hola!", // String
    boo: true // Boolean
}
```

> [!WARNING]
> Without the variables file, you cannot use functions nor the app(bot) will work.

> [!NOTE]
> It is also essential to make(initialize) the variable in this file before accessing it; the same as AoiDB. Provided, it must not be the same file AKA this file and the AoiDB variables file are different.

## Functions

| aoi.Mongo | AoiDB | Usage |
| ---- | ---- | ----- |
|  `$getVar` | `$getVar` | `$getVar[varname]` |
|  `$getGlobalUserVar` | `$getGlobalUserVar` | `$getGlobalUserMVar[varname;userId?]` |
|  `$getGuildVar` | `$getGuildVar` | `$getGuildMVar[varname;guildId?]` |
|  `$getMessageVar` | `$getMessageVar` | `$getMessageMVar[varname;messageId?]` |
|  `$getUserVar` | `$getUserVar` | `$getUserMVar[varname;userId?;guildId?]` |
|  `$getChannelVar` | `$getChannelVar` | `$getChannelMVar[varname;channelId?]` |
|  `$setVar` | `$setVar` | `$setMVar[varname;value]` |
|  `$setGlobalUserVar` | `$setGlobalUserVar` | `$setGlobalUserMVar[varname;value;userId?]` |
|  `$setGuildVar` | `$setGuildVar` | `$setGuildMVar[varname;value;guildId?]` |
|  `$setMessageVar` | `$setMessageVar` | `$setMessageMVar[varname;value;messageId?]` |
|  `$setUserVar` | `$setUserVar` | `$setUserMVar[varname;value;userId?;guildId?]` |
|  `$setChannelVar` | `$setChannelVar` | `$setChannelMVar[varname;value;channelId?]` |

### Add-on Functions

#### `$mongoArray`

A function for performing Array functions "push" and "pull".

Syntax: `$mongoArray[varname;value;action;varType;id?]`

- action - push / pull

- varType - user / globaluser / guild / global / message / channel

- id - default null(or depending on varType default will be auto added). If you want to use vars which has 2 params like user(which supports guildId and userId) use like - if "user" -> userId:guildId

#### `$mongoPing`

A function which returns the latency of mongo DB in ms.

Syntax: `$mongoPing`

#### `$deleteUserVar`

This function works primarily like a reset function which will erase the data from MongoDB.

Syntax: `$deleteUserVar[varname;userId?;guildId?;returnCount?]`

- userId - The User ID whose var should be reset. **You can also pass "all" to reset all users var in a specific guild.** (Default - Author ID)

- guildId - ID of the guild where user is in to reset. (Default - User's Guild ID)

- returnCount - If you wish to return the number of users var that it has reset, enable it by passing "true". Only when passing "all" in `userId` will it return a number more than 1. Normally, it returns 1 or 0 (if there is no data of that particular user in Mongo DB). (Default - false)

#### `$deleteGuildVar`

This function works primarily like a reset function which will erase the data from MongoDB.

Syntax: `$deleteGuildVar[varname;guildId?;returnCount?]`

- guildId - ID of the guild to reset. **You can also pass "all" to reset all users var in a specific guild.** (Default - The current Guild ID)

- returnCount - If you wish to return the number of guilds var that it has reset, enable it by passing "true". Only when passing "all" in `guildId` will it return a number more than 1. Normally, it returns 1 or 0 (if there is no data of that particular guild in Mongo DB). (Default - false)

#### `$deleteMessageVar`

This function works primarily like a reset function which will erase the data from MongoDB.

Syntax: `$deleteMessageVar[varname;messageId?;returnCount?]`

- messageId - ID of the message to reset. **You can also pass "all" to reset all messages var.** (Default - The current Message ID)

- returnCount - If you wish to return the number of messages var that it has reset, enable it by passing "true". Only when passing "all" in `messageId` will it return a number more than 1. Normally, it returns 1 or 0 (if there is no data of that particular guild in Mongo DB). (Default - false)

#### `$deleteChannelVar`

This function works primarily like a reset function which will erase the data from MongoDB.

Syntax: `$deleteChannelVar[varname;channelId?;returnCount?]`

- channelId - ID of the channel to reset. **You can also pass "all" to reset all channels var.** (Default - The current Channel ID)

- returnCount - If you wish to return the number of channels var that it has reset, enable it by passing "true". Only when passing "all" in `channelId` will it return a number more than 1. Normally, it returns 1 or 0 (if there is no data of that particular guild in Mongo DB). (Default - false)

#### `$deleteGlobalUserVar`

This function works primarily like a reset function which will erase the data from MongoDB.

Syntax: `$deleteGlobalUserVar[varname;userId?;returnCount?]`

- userId - ID of the user to reset. **You can also pass "all" to reset all users var.** (Default - The Author ID)

- returnCount - If you wish to return the number of users var that it has reset, enable it by passing "true". Only when passing "all" in `userId` will it return a number more than 1. Normally, it returns 1 or 0 (if there is no data of that particular guild in Mongo DB). (Default - false)

<br />
<hr />
<br />

> [!NOTE]
> Basically, the difference is that you have to add an "M" before the "Var" in the function name(AOI-Based) and Walah! you can use AoiDB as well as, Mongo DB in your app!

<br />
<hr />
<br />

## DiscordJS Usage

This package also has JavaScript functions which can be used with `$djsEval` which you are evaling DJS / JS in aoi or not. 

> [!NOTE]
> This section can only be used in JS evaling. But, **can be used with non aoi packages too!**

### Functions 

- `getUserVar()`
- `getGlobalUserVar()`
- `getGuildVar()`
- `getChannelVar()`
- `getMessageVar()`
- `getGlobalVar()`
- `setUserVar()`
- `setGlobalUserVar()`
- `setGuildVar()`
- `setChannelVar()`
- `setMessageVar()`
- `setGlobalVar()`

In order to use the above function, import it in the JS medium like:

```js
const { functionName } = require('aoi.mongodb/func'); // 'func' is the path where these functions are made
```
