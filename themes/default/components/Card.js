/**
 * 卡片组件
 * @param {*} param0
 * @returns
 */
const Card = (props) => {
  const { children, headerSlot, className } = props
  return <div className={className}>
        <>{headerSlot}</>
        <section className="shadow px-1 py-2 bg-white dark:bg-hexo-black-gray hover:shadow-xl duration-200 rounded-md m-1">
            {children}
        </section>
    </div>
}
export default Card
