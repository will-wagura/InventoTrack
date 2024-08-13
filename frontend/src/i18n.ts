import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "siteTitle": "Site Title",
            "timezone": "Timezone",
            "language": "Language",
            "changePassword": "Change Password",
            "newPassword": "New password",
            "confirmNewPassword": "Confirm new password",
            "updatePassword": "Update Password",
            "emailNotifications": "Email Notifications",
            "enableEmailNotifications": "Enable email notifications",
            "smsNotifications": "SMS Notifications",
            "enableSMSNotifications": "Enable SMS notifications",
            "notificationSounds": "Notification Sounds",
            "enableSoundNotifications": "Enable sound notifications",
            "updateSecurityQuestions": "Update Security Questions",
            "twoFactorAuthentication": "Two-Factor Authentication",
            "enableTwoFactorAuthentication": "Enable two-factor authentication",
            "securityQuestion1": "Security question 1",
            "answer": "Answer",
            "securityQuestion2": "Security question 2"
            // Add more translations as needed
        }
    },
    es: {
        translation: {
            "siteTitle": "Título del Sitio",
            "timezone": "Zona Horaria",
            "language": "Idioma",
            "changePassword": "Cambiar Contraseña",
            "newPassword": "Nueva contraseña",
            "confirmNewPassword": "Confirmar nueva contraseña",
            "updatePassword": "Actualizar Contraseña",
            "emailNotifications": "Notificaciones por Correo Electrónico",
            "enableEmailNotifications": "Habilitar notificaciones por correo electrónico",
            "smsNotifications": "Notificaciones por SMS",
            "enableSMSNotifications": "Habilitar notificaciones por SMS",
            "notificationSounds": "Sonidos de Notificación",
            "enableSoundNotifications": "Habilitar sonidos de notificación",
            "updateSecurityQuestions": "Actualizar Preguntas de Seguridad",
            "twoFactorAuthentication": "Autenticación de Dos Factores",
            "enableTwoFactorAuthentication": "Habilitar autenticación de dos factores",
            "securityQuestion1": "Pregunta de seguridad 1",
            "answer": "Respuesta",
            "securityQuestion2": "Pregunta de seguridad 2"
            // Add more translations as needed
        }
    }
    // Add more languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

