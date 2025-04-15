/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <>
      {/* Tailwind CSS 配置 - 添加自定义颜色 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    themeColor: {
                      DEFAULT: '#C76442',
                      dark: '#C86442'
                    },
                    paper: {
                      DEFAULT: '#FAF9F5',
                      dark: '#262624'
                    },
                    card: {
                      DEFAULT: '#FFFFFF',
                      dark: '#30302E'
                    }
                  }
                }
              }
            }
          `
        }}
      />
      <style jsx global>{`
        /* 底色 */
        body {
          background-color: #FAF9F5;
        }
        .dark body {
          background-color: #262624;
        }

        /* 菜单下划线动画 */
        #theme-next .menu-link {
          text-decoration: none;
          background-image: linear-gradient(#4e80ee, #4e80ee);
          background-repeat: no-repeat;
          background-position: bottom center;
          background-size: 0 2px;
          transition: background-size 100ms ease-in-out;
        }
        #theme-next .menu-link:hover {
          background-size: 100% 2px;
          color: #4e80ee;
        }
      `}</style>
    </>
  )
}

export { Style }
