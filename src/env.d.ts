/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_WHATSAPP_NUMBER?: string;
  readonly PUBLIC_PHONE?: string;
  readonly PUBLIC_EMAIL?: string;
  readonly PUBLIC_INSTAGRAM_URL?: string;
  readonly PUBLIC_FACEBOOK_URL?: string;
  readonly PUBLIC_SERVICE_AREA?: string;
  readonly PUBLIC_MEDIA_APPROVED?: string;
  readonly PUBLIC_PRIVACY_NOTICE_APPROVED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
