function Orders({ children }) {
  return (
    <section className="Orders section-padding-small">
      <h1 className="heading-1 heading-1--orders u-margin-bottom-small-2 ">
        Order list
      </h1>

      {children}
    </section>
  );
}

export default Orders;
