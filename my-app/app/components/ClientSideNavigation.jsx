'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../products/[id]/productDetails.module.css';

export default function ClientSideNavigation() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <Link href={`/products?${queryString}`} className={styles.backButton}>
      ← Back to Products
    </Link>
  );
}