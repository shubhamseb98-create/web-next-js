import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const imgSrc = product.image
    ? product.image.startsWith('http') || product.image.startsWith('/')
      ? product.image
      : `/uploads/${product.image}`
    : '/images/slide1.jpg';

  return (
    <Link href={product.slug} className="prod-card flagship">
      <img
        className="prod-card-img"
        src={imgSrc}
        alt={product.title || 'Product'}
        loading="lazy"
      />

      <div className="prod-shimmer"></div>
      <div className="prod-overlay"></div>

      <span className="prod-arrow">↗</span>

      <div className="prod-body">
        <p className="prod-tag">{product.tag}</p>

        <p className="prod-name">{product.title}</p>

        <p className="prod-cta">
          {product.cta || 'View Details'}
          <span> →</span>
        </p>
      </div>
    </Link>
  );
}