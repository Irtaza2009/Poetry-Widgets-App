import I18n from "react-native-i18n";

// Translations

I18n.translations = {
  en: {
    settings: "Settings",
    darkMode: "Dark Mode",
    notifications: "Enable Notifications",
    back: "Back",
    language: "Language",
  },
  ur: {
    settings: "ترتیبات",
    darkMode: "ڈارک موڈ",
    notifications: "اطلاعات کو فعال کریں",
    back: "واپس",
    language: "زبان",
  },
  hi: {
    settings: "सेटिंग्स",
    darkMode: "डार्क मोड",
    notifications: "सूचनाएँ सक्षम करें",
    back: "वापस",
    language: "भाषा",
  },
};

I18n.fallbacks = true;

export default I18n;