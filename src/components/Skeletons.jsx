import { SkeletonBodyText } from "@shopify/polaris";

export const GraphSkalaton = () => {
  return (
    <div style={{ padding: "16px" }}>
      {/* Y-Axis skeleton */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "20px",
              height: `${(index + 1) * 20}px`,
              backgroundColor: "#f4f6f8",
              borderRadius: "4px",
            }}
          ></div>
        ))}
      </div>
      <SkeletonBodyText lines={1} />
    </div>
  );
};

export const PieChartSkeleton = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px", // Adjust the height to match your layout
      }}
    >
      <div
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "conic-gradient(#f4f6f8 25%, transparent 25%)",
          border: "8px solid #f4f6f8",
          animation: "spin 1.5s linear infinite",
        }}
      />
    </div>
  );
};
