const v = require('../index.js')?.getData()?.variables;
const GuildVar = require('../schema/guildVar.js');
const { convertType } = require('../func/convertType.js');

module.exports = {
  name: "$setGuildVar",
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);

    let [ varname, value, guildId = d.guild?.id ] = data.inside.splits;
    let res;

    varname = varname?.trim();
    value = value?.trim();
    guildId = guildId?.trim();

    // Converting the Data Type of Value depending on the input
    value = convertType(value);

    if (v[varname] === undefined) return d.channel.send("Variable not initialized.");

    try {
      const newAssign = await GuildVar.findOneAndUpdate({
        guildId: guildId,
        variable: varname      
      }, {
        $set: { value: value }
      }, {
        upsert: true, new: true
      });
        newAssign.markModified();
        await newAssign.save();
    } catch (err) {
      console.error(`Error in ${data.function}. Error: ${err}`);
      return;
    };

    return {
      code: d.util.setCode(data),
    };
  }
};