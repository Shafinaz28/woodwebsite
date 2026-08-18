function Newsletter() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="bg-dark-brown text-background">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10 py-12 md:py-14">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex items-center gap-5 flex-1 w-full">
            <img
              src="/images/logo.png"
              alt="Arileon"
              className="h-14 md:h-16 w-auto object-contain brightness-0 invert opacity-95 shrink-0"
            />
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-wide uppercase">
                Stay Updated
              </h2>
              <p className="mt-1 text-sm text-cream/80">
                Subscribe to get updates on new arrivals and exclusive offers.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full lg:max-w-xl items-stretch h-12 bg-cream overflow-hidden"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 px-4 text-sm text-dark-brown outline-none placeholder:text-wood/60 bg-transparent"
            />
            <button
              type="submit"
              className="px-6 bg-brown text-background text-[11px] uppercase tracking-[0.16em] hover:bg-wood transition shrink-0"
            >
              Subscribe
            </button>
          </form>

          <img
            src="/images/story/made-with-intention.png"
            alt=""
            aria-hidden
            className="hidden xl:block h-24 w-24 object-cover opacity-90 shrink-0"
          />
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
