import React from 'react';

export interface Point {
  longitude: number;
  latitude: number;
}

export interface MarkerPoint extends Point {
  metadata?: {
    id: string;
    label: string;
    popupContent: React.ReactNode;
  };
}
