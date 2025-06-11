export default function Logo() {
  return (
    <img
      src={"/logo.png"}
      className="w-24"
      alt="logo"
      style={{ cursor: "pointer" }}
      onClick={() => (window.location.href = "/")}
    />
  );
}
