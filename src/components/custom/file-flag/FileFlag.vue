<script setup lang="ts">
import { cn } from '@/lib/utils';

type AvailableMimetypes =
  | "text/plain"
  | "text/html"
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation";

type FileFlagProps = {
  mimeType: AvailableMimetypes;
};

const props = withDefaults(defineProps<FileFlagProps>(), {
  mimeType: "application/pdf",
});
</script>

<template>
  <span
    :class="cn('flex items-center justify-center w-12 h-12 rounded-md hover:brightness-90 cursor-pointer bg-gradient-to-br', {
      'from-green-500 to-lime-600': ['text/plain', 'text/html', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(props.mimeType),
      'from-blue-500 to-cyan-500': ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'].includes(props.mimeType),
      'from-yellow-500 to-orange-600': ['image/png', 'image/jpeg', 'image/jpg'].includes(props.mimeType),
      'from-red-600 to-pink-500': ['application/pdf'].includes(props.mimeType),
    })"
  >
    <h1 class="font-semibold text-white">
      {{
        mimeType === "text/plain" || mimeType === "text/html"
          ? "TXT"
          : mimeType === "image/png" ||
            mimeType === "image/jpeg" ||
            mimeType === "image/jpg"
          ? "IMG"
          : mimeType === "application/pdf"
          ? "PDF"
          : mimeType === "application/msword" ||
            mimeType ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ? "DOC"
          : mimeType === "application/vnd.ms-excel" ||
            mimeType ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ? "XLS"
          : mimeType === "application/vnd.ms-powerpoint" ||
            mimeType ===
              "application/vnd.openxmlformats-officedocument.presentationml.presentation"
          ? "PPT"
          : null
      }}
    </h1>
  </span>
</template>
