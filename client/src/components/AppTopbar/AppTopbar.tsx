import { useRef } from 'react';

import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Badge } from 'primereact/badge';
import { Menu } from 'primereact/menu';

import AvatarIcon from 'react-avatar';

import { useAuth } from '@/hooks/useAuth';

import { Link } from '@/components/Link/Link';

import './AppTopbar.css';

interface CustomMenuItem extends MenuItem {
  badge?: number,
  shortcut?: string,
  to?: string
}

function SignInMenu() {
  const { user, logout, setLoginVisible } = useAuth();
  const menuRight = useRef<Menu>(null);
  
  const items: CustomMenuItem[] = [
    {
      command: () => {
        if (user?.name) {
          logout();
        } else {
          setLoginVisible(true);
        }
      },
      icon: user?.name ? 'pi pi-sign-out' : 'pi pi-user',
      label: user?.name? 'Выйти' : 'Войти'
    }
  ];
  return (
    <div>
      <AvatarIcon
        name={user?.name||'undefined'}
        initials={user?.name.split(' ').map((n)=>n[0]).join('')||'UN' }
        size='40'
        fgColor='#1f2937'
        color='#67e8f9'
        onClick={(event) => {
          if (menuRight.current) menuRight.current.toggle(event);
        }}
      />
      {/*
      <Avatar
        image={'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png'}
        //image={user?.name ? 'https://ui-avatars.com/api/?name=' + user?.name.replace(' ', '+') + '&background=67e8f9&color=1f2937' : 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png'}
        //shape='circle'
        onClick={(event) => {
          if (menuRight.current) menuRight.current.toggle(event);
        }}
        aria-controls='popup_menu_right'
        aria-haspopup
      />
      */}
      <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
    </div>
  );
}

export default function AppMenu() {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemRenderer = (item: any) => (
    item?.to ?
    <Link to={item.to} className='flex align-items-center p-menuitem-link'>
      <span className={item.icon} />
      <span className='mx-2'>{item.label}</span>
      {item.badge && <Badge className='ml-auto' value={item.badge} />}
      {item.shortcut && <span className='ml-auto border-1 surface-border border-round surface-100 text-xs p-1'>{item.shortcut}</span>}
    </Link>
    :
    <a
      href={'#'+item.to}
      className='flex align-items-center p-menuitem-link'
    >
      <span className={item.icon} />
      <span className='mx-2'>{item.label}</span>
      {item.badge && <Badge className='ml-auto' value={item.badge} />}
      {item.shortcut && <span className='ml-auto border-1 surface-border border-round surface-100 text-xs p-1'>{item.shortcut}</span>}
    </a>
  );

  const templatesitems: CustomMenuItem[] = [
    {
      label: 'Apollo',
      icon: 'pi pi-palette',
      badge: 2,
      template: itemRenderer
    },
    {
      label: 'Ultima',
      icon: 'pi pi-palette',
      badge: 3,
      template: itemRenderer
    }
  ];
  
  const projectitems: CustomMenuItem[] = [
    {
      label: 'Core',
      icon: 'pi pi-bolt',
      shortcut: '⌘+S',
      template: itemRenderer
    },
    {
      label: 'Blocks',
      icon: 'pi pi-server',
      shortcut: '⌘+B',
      template: itemRenderer
    },
    {
      label: 'UI Kit',
      icon: 'pi pi-pencil',
      shortcut: '⌘+U',
      template: itemRenderer
    },
    {
      separator: true
    },
    {
      label: 'Templates',
      icon: 'pi pi-palette',
      items: templatesitems
    }
  ];

  const items: CustomMenuItem[] = [
    {
      label: 'Главная',
      icon: 'pi pi-home',
      to: '/',
      template: itemRenderer
    },
    {
      label: 'Тесты',
      icon: 'pi pi-box',
      to: '/tests',
      template: itemRenderer
    },
    {
      label: 'Теория',
      icon: 'pi pi-graduation-cap',
      to: '/theory',
      template: itemRenderer
    },
    {
      label: 'Projects',
      icon: 'pi pi-search',
      items: projectitems
  },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
      badge: 7,      
      template: itemRenderer
    }
  ];

  const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
  const end = (
    <div className="flex align-items-center gap-2">
      {/*<InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />*/}
      <SignInMenu/>
    </div>
  );

  return (
    <Menubar model={items} start={start} end={end} className='mb-3'/>
  )
}
        