/**
 * 卡片组件
 * @param {*} param0
 * @returns
 */
const Card = (props) => {
  const { children, headerSlot, className } = props
  return <div className={className}>
        <>{headerSlot}</>
        <section className="shadow p-1 bg-card dark-bg-card-dark duration-200 rounded-md my-1 mx-5">
            {children}
        </section>
    </div>
}
export default Card
