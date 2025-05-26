import React, { useState } from 'react';

const footerLinks = [
  {
    title: 'Barbecue Studio',
    links: [
      { label: 'About', hash: 'About' },
      { label: 'Features', hash: 'Features' },
      { label: 'Store', href: '/store' },
    ],
  },
  {
    title: 'Follow Us',
    links: [
      { label: '', href: '', external: true },
      { label: '', href: '', external: true },
    ],
  },
];

function scrambleText(text, setText) {
  const chars = 'AbcDeFghijklmnopqrsTuvxyz';
  let iterations = 0;
  const maxIterations = 10;
  const original = text;

  const interval = setInterval(() => {
    const scrambled = original
      .split('')
      .map((char, i) =>
        i < iterations ? original[i] : chars[Math.floor(Math.random() * chars.length)]
      )
      .join('');

    setText(scrambled);
    iterations++;

    if (iterations > original.length) {
      clearInterval(interval);
      setText(original);
    }
  }, 30);
}

function ScrambleLink({ label, href, external }) {
  const [displayText, setDisplayText] = useState(label);

  return (
    <a
      href={href}
      className="text-gray-300 relative inline-block transition-all duration-500 fade-in-left"
      onMouseEnter={() => scrambleText(label, setDisplayText)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {displayText}
    </a>
  );
}

export default function KPRVerseFooter() {
  return (
    <footer className="bg-black text-gray-200 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <ScrambleLink
                    label={link.label}
                    href={link.href}
                    external={link.external}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6">
        <div className="container mx-auto px-4 text-center text-sm">
          Barbecue Studio
        </div>
      </div>
    </footer>
  );
}
