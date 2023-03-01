const {getStatus, change} = require(`./fonk.js`)
module.exports = {
    dec1: function(customId) {
      return customId === "mesaj_sil" ? change(customId) : getStatus("mesaj_sil");
    },
    dec2: function(customId) {
      return customId === "mesaj_değ" ? change(customId) : getStatus("mesaj_değ");
    },
    dec3: function(customId) {
      return customId === "ses_gir" ? change(customId) : getStatus("ses_gir");
    },
    dec4: function(customId) {
      return customId === "ses_cik" ? change(customId) : getStatus("ses_cik");
    },
    dec5: function(customId) {
      return customId === "ses_değ" ? change(customId) : getStatus("ses_değ");
    },
    dec6: function(customId) {
      return customId === "avatar" ? change(customId) : getStatus("avatar");
    },
    dec7: function(customId) {
      return customId === "use_na" ? change(customId) : getStatus("use_na");
    },
    dec8: function(customId) {
      return customId === "koruma" ? change(customId) : getStatus("koruma");
    }
  };