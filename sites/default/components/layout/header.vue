<script lang="ts" setup>
const { locales } = useI18n();
import type { MenulinkInterface } from '~/sites/default/components/header/DesktopMenu.vue';
interface HeaderInterface {
    menu: MenulinkInterface[];
}
const props = withDefaults(defineProps<HeaderInterface>(), {});
const mobileMenuOpen = ref(false);
</script>
<template>
  <div>
    <AuthenticationStatus />
    <nav
      class="container mx-auto flex items-center justify-between py-6"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <HeaderLogo />
      </div>
      <HeaderMenuToggler @on-menu-toggle="(value) => (mobileMenuOpen = value)" />
      <HeaderDesktopMenu :menu="props.menu" />
      <div
        v-if="locales.length !== 1"
        class="hidden lg:flex lg:flex-1 lg:justify-end"
      >
        <HeaderLanguageSwitch />
      </div>
    </nav>
    <HeaderMobileMenu
      :is-open="mobileMenuOpen"
      :menu="props.menu"
      @on-menu-toggle="(value) => (mobileMenuOpen = value)"
    />
  </div>
</template>
