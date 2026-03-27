interface StudioCardProps {
  name: string;
  type: string;
  city: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  tags: string[];
}

export default function StudioCard({
  name,
  type,
  city,
  price,
  rating,
  reviewCount,
  image,
  tags,
}: StudioCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8DED0",
        borderRadius: "18px",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 16px 48px rgba(196, 112, 58, 0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: "220px",
          backgroundColor: "#D4B896",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Type badge */}
        <span
          style={{
            position: "absolute",
            top: "0.875rem",
            left: "0.875rem",
            backgroundColor: "rgba(255,255,255,0.92)",
            color: "#8B4513",
            fontSize: "0.72rem",
            fontWeight: 700,
            padding: "0.3rem 0.7rem",
            borderRadius: "100px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {type}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.5rem",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#1C1410",
              lineHeight: 1.2,
              maxWidth: "200px",
            }}
          >
            {name}
          </h3>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#C4703A",
              }}
            >
              ₹{price.toLocaleString()}
            </p>
            <p
              style={{
                fontSize: "0.72rem",
                color: "#9B7B60",
              }}
            >
              /hour
            </p>
          </div>
        </div>

        {/* Location & Rating */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.875rem",
          }}
        >
          <span
            style={{
              fontSize: "0.82rem",
              color: "#7A5C42",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            📍 {city}
          </span>
          <span
            style={{
              fontSize: "0.82rem",
              color: "#7A5C42",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            ⭐ {rating} ({reviewCount})
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: "#F5EFE7",
                color: "#7A5C42",
                fontSize: "0.72rem",
                fontWeight: 500,
                padding: "0.25rem 0.625rem",
                borderRadius: "100px",
                border: "1px solid #E8DED0",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          style={{
            width: "100%",
            padding: "0.7rem",
            backgroundColor: "transparent",
            color: "#C4703A",
            border: "1.5px solid #C4703A",
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#C4703A";
            e.currentTarget.style.color = "#FAF7F2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#C4703A";
          }}
        >
          View & Book →
        </button>
      </div>
    </div>
  );
}