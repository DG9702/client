import React, {useState} from 'react'
import {signOut} from 'next-auth/react';
import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import {useLogoutQuery} from '@/redux/features/auth/authApi';

type Props={
  children: any,
  items: any,
  isOpen?: boolean,
}

const CustomMenu: React.FC<Props>=({
  items,
  children,
  isOpen = false,
}) => {
    const [logout,setLogout] = useState<boolean>(false);

    const {}=useLogoutQuery(undefined,{
        skip:!logout ? true : false,
    });

    const onClick = async (item: any) => {
      if(item?.type==="logout") {
          setLogout(true);
          await signOut();
        }
        
    }

    const renderItems = () => {
        return items.map((item: any, index: any) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {onClick(item);}}
                />
            );
        });
    };

    const renderResult = (attrs: any) => (
        <div className="min-w-56 bg-white duration-300 dark:bg-[#121212] shadow-xl rounded-xl py-2 px-6" tabIndex="-1" {...attrs}>
            <div className="pb-2">
                <div className="overflow-y-auto flex flex-col">{renderItems()}</div>
            </div>
        </div>
    );

  return (
    <Tippy
        interactive={true}
        placement="bottom-end"
        delay={[0, 900]}
        offset={[12, 8]}
        visible={isOpen}
        hideOnClick={false}
        render={renderResult}
      
    >
        {children}
    </Tippy>
  )
}

export default CustomMenu