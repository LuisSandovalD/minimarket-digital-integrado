export default function FooterLinks({
  title,
  links,
}) {
  return (
    <div>
      <h3 className="font-bold">
        {title}
      </h3>

      <ul
        className="
          mt-5
          space-y-3
          text-sm
          text-zinc-500
        "
      >
        {links.map((link, index) => (
          <li
            key={index}
            className="
              cursor-pointer
              transition-all
              hover:text-black
            "
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}