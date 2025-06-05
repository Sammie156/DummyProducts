const Footer = () => {
  return (
    <div className="w-full bg-gray-900 text-gray-300 py-6 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left text-sm">
          © {new Date().getFullYear()} — Made by{" "}
          <span className="font-semibold text-white">Samanwaya Datta</span>
        </div>

        <div className="text-sm flex gap-4">
          <a href="https://github.com/Sammie156" className="hover:text-white transition">GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
