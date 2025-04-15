/**
 * 卡片组件
 * @param {*} param0
 * @returns
 */
const Card = (props) => {
  const { children, headerSlot, className } = props
  return <div className={className}>
        <>{headerSlot}</>
        <section className="shadow p-1 bg-white dark:bg-hexo-black-gray duration-200 rounded-md my-1 mx-4">
            {children}
        </section>
    </div>
}
export default Card
