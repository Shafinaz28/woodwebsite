import {
  Truck,
  ShieldCheck,
  BadgeCheck,
  Headphones,
} from "lucide-react";

function Benefits() {
  const benefits = [
    {
      id: 1,
      icon: Truck,
      title: "Pan India Delivery",
      description: "Reliable delivery across major cities in India.",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "Safe and protected payment experience.",
    },
    {
      id: 3,
      icon: BadgeCheck,
      title: "Quality Assured",
      description: "Carefully crafted furniture with premium materials.",
    },
    {
      id: 4,
      icon: Headphones,
      title: "Customer Support",
      description: "Dedicated assistance before and after your purchase.",
    },
  ];

  return (
    <section className="bg-[#f3f0ea] border-t border-black/10">

      <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-14 md:py-18">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.id}
                className={`
                  px-6
                  py-8
                  text-center
                  flex
                  flex-col
                  items-center
                  ${
                    index !== benefits.length - 1
                      ? "lg:border-r lg:border-black/10"
                      : ""
                  }
                `}
              >
                <Icon
                  size={30}
                  strokeWidth={1.3}
                  className="mb-5"
                />

                <h3 className="text-base font-medium">
                  {benefit.title}
                </h3>

                <p className="mt-3 max-w-[240px] text-sm leading-6 text-black/55">
                  {benefit.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Benefits;
