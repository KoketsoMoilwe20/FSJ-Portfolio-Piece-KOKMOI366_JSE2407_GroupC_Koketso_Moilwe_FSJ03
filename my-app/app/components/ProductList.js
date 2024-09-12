'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/productList.module.css';

export default function ProductList({ initialProducts }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 10;
