const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="text-center mt-12">
      <p className="text-white/60 text-sm">
        © {year} • All rights reserved Designed and developed by{" "}
        <span className="text-white font-bold">Bhavin Pathak</span>
      </p>
    </div>
  );
};

export default Footer;
