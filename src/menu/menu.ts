class Menu {
  static MENU_TYPE = {
    WRITE_EMAIL: "WRITE_EMAIL",
    REPLY_EMAIL: "REPLY_EMAIL",
    SUMMARIZE_EMAIL: "SUMMARIZE_EMAIL",
    SUGGEST_REPLY: "SUGGEST_REPLY",
    REWRITE_EMAIL: "REWRITE_EMAIL",
    TRANSLATE_TO: "TRANSLATE_TO",
    SETTINGS: "SETTING",
    ACTIVATION: "ACTIVATION"
  };
  
  static menuItems = [
    { name: 'Write for me', value: this.MENU_TYPE.WRITE_EMAIL, isGlobal: true, iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365" },
    { name: 'Reply for me', value: this.MENU_TYPE.REPLY_EMAIL, isGlobal: false, iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365" },
    { name: 'Summarize email', value: this.MENU_TYPE.SUMMARIZE_EMAIL, isGlobal: false, iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365" },
    { name: 'Suggest reply', value: this.MENU_TYPE.SUGGEST_REPLY, isGlobal: false, iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365" },
    { name: 'Rewrite email', value: this.MENU_TYPE.REWRITE_EMAIL, isGlobal: false, iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365" },
    { name: 'Translate to', value: this.MENU_TYPE.TRANSLATE_TO, isGlobal: false, iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365" }
  ];

  static getMenu(isGlobal: boolean) {
    return this.menuItems.filter(menuItem => isGlobal ? menuItem.isGlobal : !menuItem.isGlobal);
  }
};

export default Menu;