import { Logo, OrderForm } from "@/components";

const OrderFormView = () => {
  return (
    <section className="flex flex-col gap-12 h-screen justify-center items-center">
      <Logo size="5xl" />
      <OrderForm />
    </section>
  );
};

export default OrderFormView;
