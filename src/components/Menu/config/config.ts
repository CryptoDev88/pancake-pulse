import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  MoreIcon,
  HomeIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Home'),
      icon: HomeIcon,
      fillIcon: HomeIcon,
      href: 'https:dextop.pro',
      image: '/images/decorations/pe2.png',
      showItemsOnMobile: false,
      items: [].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Menu'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
        },
        {
          label: t('Liquidity'),
          href: '/liquidity',
        },
        {
          label: t('Burn'),
          href: '/burn',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    // {
    //   label: t('Presale'),
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   href: '/presale',
    //   image: '/images/decorations/pe2.png',
    //   showItemsOnMobile: false,
    //   items: [
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('Audits'),
    //   icon: TrophyIcon,
    //   fillIcon: TrophyFillIcon,
    //   href: '/audits',
    //   image: '/images/decorations/pe2.png',
    //   showItemsOnMobile: false,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('Whitepaper'),
    //   icon: MoreIcon,
    //   href: 'https://dextop.pro/whitepaper.pdf',
    //   image: '/images/decorations/pe2.png',
    //   type: DropdownMenuItemType.EXTERNAL_LINK,
    //   showItemsOnMobile: false,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
