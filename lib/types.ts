import React from 'react';

export interface DataItem {
  x: number;
  y: number;
  r: number;
  color: string;
}

export interface PixelData {
  x: number;
  y: number;
  color: number[];
}

export interface PlaceholdersAndVanishInputProps {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  type?: string;
}

export interface PlaceholdersAndVanishInputRef extends HTMLInputElement {
  triggerVanish: () => void;
  getValue: () => string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  subscription: string;
  subscription_status: string;
  // Add other relevant properties
}