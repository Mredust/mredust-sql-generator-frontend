import {
  GithubOutlined,
  SketchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import './index.less';

/**
 * 全局 Footer
 *
 * @author https://github.com/Mredust
 */
const GlobalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      className="default-footer"
      copyright={`${currentYear} Mredust`}
      links={[
        {
          key: 'master',
          title: (
            <>
              <UserOutlined /> 站长：Mredust
            </>
          ),
          href: 'https://github.com/Mredust',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 代码已开源
            </>
          ),
          href: 'https://github.com/Mredust/mredust-sql-generator-frontend',
          blankTarget: true,
        },
        {
          key: 'learn',
          title: (
            <>
              <SketchOutlined /> 源码借鉴：程序员鱼皮
            </>
          ),
          href: 'https://github.com/liyupi/sql-father-frontend-public',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default GlobalFooter;
