import { technologyGroups } from "@/content/site";

export function TechnologyStackSection() {
  return (
    <section
      aria-labelledby="technology-heading"
      className="border-t border-neutral-100 bg-white py-16 md:py-20"
    >
      <div className="container-wide flex flex-col gap-10 md:gap-12">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="text-xs font-medium uppercase text-neutral-500">
            Technology
          </p>
          <h2
            className="text-balance text-2xl font-semibold leading-tight text-neutral-950 md:text-3xl"
            id="technology-heading"
          >
            A practical stack for reliable software.
          </h2>
          <p className="max-w-xl text-sm leading-6 text-neutral-600">
            Tools are chosen for maintainability, speed, and long-term value.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {technologyGroups.map((group) => (
            <div className="flex flex-col gap-4" key={group.title}>
              <h3 className="text-xs font-medium uppercase text-neutral-500">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li className="text-sm leading-5 text-neutral-700" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
