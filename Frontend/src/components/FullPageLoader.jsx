// components/FullPageLoader.jsx
const FullPageLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <span style={{ color: "white", fontSize: "18px" }}>
        Loading...
      </span>
    </div>
  );
};

export default FullPageLoader;
