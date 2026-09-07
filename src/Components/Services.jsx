import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const servicesData = [
    {
        key: 'globalShipping',
        labelEn: '01 SHIPPING',
        labelPl: '01 SPEDYCJA',
        eyebrowEn: 'OCEAN & MARITIME FREIGHT',
        eyebrowPl: 'FRACHT MORSKI I OCEANICZNY',
        titleEn: 'Global Container & Bulk Shipping',
        titlePl: 'Kontenerowy i Masowy Fracht Morski',
        subtitleEn: 'Scheduled deep-sea container services and chartered vessel coordination connecting core European ports with international trade corridors.',
        subtitlePl: 'Regularne przewozy kontenerowe i czartery statków łączące kluczowe porty europejskie z globalnymi korytarzami handlowymi.',
        specsEn: [
            { bold: 'Tier-1 Carrier Allocations', desc: 'FCL / LCL' },
            { bold: 'Port Agency & Berthing Oversight', desc: 'Direct Control' },
            { bold: 'Full Export/Import Customs Filing', desc: 'T1 / Customs Brokerage' }
        ],
        specsPl: [
            { bold: 'Alokacje u Przewoźników Tier-1', desc: 'FCL / LCL' },
            { bold: 'Nadzór Agencyjny i Portowy', desc: 'Bezpośredni Nadzór' },
            { bold: 'Kompleksowa Obsługa Celna', desc: 'T1 / Agencja Celna' }
        ],
        buttonEn: 'Inquire Freight Rates',
        buttonPl: 'Wyceń Fracht Morski',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
        alt: 'Container cargo ship operating global freight'
    },
    {
        key: 'railFreight',
        labelEn: '02 RAIL',
        labelPl: '02 KOLEJ',
        eyebrowEn: 'INLAND INTERMODAL TRANSIT',
        eyebrowPl: 'TRANSPORT KOLEJOWY I INTERMODALNY',
        titleEn: 'Cross-Border Rail Freight Coordination',
        titlePl: 'Międzynarodowa Koordynacja Przewozów Kolejowych',
        subtitleEn: 'Dedicated block train services and wagonload transport linking industrial manufacturing hubs across the European Union and Eurasian corridors.',
        subtitlePl: 'Dedykowane pociągi całopociągowe i przewozy wagonowe łączące ośrodki przemysłowe UE i korytarze eurazjatyckie.',
        specsEn: [
            { bold: 'Standard & Broad Gauge Transshipment', desc: '1435mm / 1520mm' },
            { bold: 'First/Last-Mile Depot & Siding Handling', desc: 'Terminal Operations' },
            { bold: 'CIM/SMGS Documentation & Border Brokerage', desc: 'Cross-Border Filing' }
        ],
        specsPl: [
            { bold: 'Przeładunki Normalno- i Szerokotorowe', desc: '1435mm / 1520mm' },
            { bold: 'Obsługa Bocznic i Terminali', desc: 'Operacje Terminalowe' },
            { bold: 'Dokumentacja CIM/SMGS i Agencja Celna', desc: 'Obsługa Graniczna' }
        ],
        buttonEn: 'Inquire Rail Routes',
        buttonPl: 'Sprawdź Trasy Kolejowe',
        image: 'https://unsplash.com/photos/JQ6knLuGZAA/download?w=1200',
        alt: 'Train yard filled with lots of different trains'
    },
    {
        key: 'customSolutions',
        labelEn: '03 SOLUTIONS',
        labelPl: '03 PROJEKTY',
        eyebrowEn: 'CONTRACT & PROJECT LOGISTICS',
        eyebrowPl: 'LOGISTYKA KONTRAKTOWA I PROJEKTOWA',
        titleEn: 'Custom Industrial Routing Solutions',
        titlePl: 'Dedykowane Inżynieryjne Rozwiązania Logistyczne',
        subtitleEn: 'Tailored freight engineering for high-volume supply chains, heavy machinery, out-of-gauge (OOG) project cargo, and recurring industrial lanes.',
        subtitlePl: 'Dedykowane rozwiązania logistyczne dla ładunków gabarytowych (OOG), ciężkich maszyn i przemysłowych łańcuchów dostaw.',
        specsEn: [
            { bold: 'Heavy Machinery & Out-of-Gauge Chartering', desc: 'OOG Cargo' },
            { bold: 'Supply Chain Lead-Time & Cost Audits', desc: 'Cost Optimization' },
            { bold: 'Dedicated Operations Desk with SLA Windows', desc: '2-Hour SLA' }
        ],
        specsPl: [
            { bold: 'Czarter Ładunków Ponadgabarytowych', desc: 'Ładunki OOG' },
            { bold: 'Audyt Czasu i Kosztów Łańcucha Dostaw', desc: 'Optymalizacja' },
            { bold: 'Dedykowany Zespół Operacyjny z SLA', desc: 'SLA 2-Godziny' }
        ],
        buttonEn: 'Request Custom Routing',
        buttonPl: 'Zamów Projekt Trasy',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Logistics cargo hub warehouse facility'
    },
    {
        key: 'consulting',
        labelEn: '04 ADVISORY',
        labelPl: '04 DORADZTWO',
        eyebrowEn: 'TRADE ADVISORY & COMPLIANCE',
        eyebrowPl: 'DORADZTWO CELNE I REGULACYJNE',
        titleEn: 'Supply Chain & Customs Consulting',
        titlePl: 'Konsulting Celny i Architektura Łańcucha Dostaw',
        subtitleEn: 'Strategic regulatory guidance and customs architecture designed to mitigate tariff risks, eliminate port delays, and secure critical cargo flows.',
        subtitlePl: 'Doradztwo strategiczne i procedury celne zapobiegające opóźnieniom portowym oraz optymalizujące ryzyko taryfowe.',
        specsEn: [
            { bold: 'HS Code Tariff Classification & AEO Protocols', desc: 'AEO Certified' },
            { bold: 'Lane Risk Mitigation & Sanction Screening', desc: 'Compliance Audit' },
            { bold: 'EU Fiscal Representation & Bonded Storage', desc: 'Duty Deferral' }
        ],
        specsPl: [
            { bold: 'Klasyfikacja Taryfowa HS i Procedury AEO', desc: 'Certyfikat AEO' },
            { bold: 'Analiza Ryzyka Tras i Weryfikacja Sankcyjna', desc: 'Audyt Zgodności' },
            { bold: 'Przedstawicielstwo Fiskalne i Składy Celne', desc: 'Odroczenie Cła' }
        ],
        buttonEn: 'Consult an Advisor',
        buttonPl: 'Skonsultuj z Ekspertem',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        alt: 'B2B logistics strategy consulting session'
    },
    {
        key: 'metalSupply',
        labelEn: '05 METALS',
        labelPl: '05 METALE',
        eyebrowEn: 'RAW MATERIALS & METALLURGY',
        eyebrowPl: 'METALE I SUROWCE PRZEMYSŁOWE',
        titleEn: 'Structural & Industrial Metal Supply',
        titlePl: 'Dostawy Metali Przemysłowych i Konstrukcyjnych',
        subtitleEn: 'Direct-mill sourcing and strategic inventory distribution of structural, mechanical, and precision steel products for fabrication and construction.',
        subtitlePl: 'Bezpośrednie dostawy z hut i dystrybucja wyrobów stalowych, konstrukcyjnych oraz precyzyjnych dla przemysłu.',
        specsEn: [
            { bold: 'Coils, Heavy Plates & Structural Beams', desc: 'Direct-Mill Sourcing' },
            { bold: 'EN 10204 3.1/3.2 & ASTM Certified Quality', desc: 'Certified Mill Specs' },
            { bold: 'Just-In-Time Direct-to-Site Deliveries', desc: 'JIT Logistics' }
        ],
        specsPl: [
            { bold: 'Blachy w Zwojach, Grube i Profile', desc: 'Prosto z Huty' },
            { bold: 'Certyfikaty Jakości EN 10204 3.1/3.2 i ASTM', desc: 'Pełne Atesty' },
            { bold: 'Dostawy Direct-to-Site w Systemie JIT', desc: 'Logistyka JIT' }
        ],
        buttonEn: 'Request Metal Specs',
        buttonPl: 'Zapytaj o Specyfikację Metali',
        image: 'https://unsplash.com/photos/ENiGFCmBYj4/download?w=1200',
        alt: 'Black and yellow metal tank'
    },
    {
        key: 'slagSupply',
        labelEn: '06 SLAG & BYPRODUCTS',
        labelPl: '06 ŻUŻEL I KRUSZYWA',
        eyebrowEn: 'CIRCULAR INDUSTRIAL AGGREGATES',
        eyebrowPl: 'PRODUKTY UBOCZNE I KRUSZYWA HUTNICZE',
        titleEn: 'Metallurgical Slag & Byproduct Sourcing',
        titlePl: 'Dystrybucja Żużla i Produktów Ubocznych',
        subtitleEn: 'Bulk distribution of controlled smelting aggregates and mineral byproducts engineered for high-durability road base, civil foundations, and concrete additives.',
        subtitlePl: 'Hurtowa dystrybucja certyfikowanych kruszyw hutniczych i produktów ubocznych przeznaczonych do budowy dróg i fundamentów.',
        specsEn: [
            { bold: 'Engineered Compaction Gradations', desc: '0–31.5mm / 0–63mm' },
            { bold: 'REACH-Compliant & Chemically Inert Materials', desc: 'Eco-Certified' },
            { bold: 'High-Volume Rail Hopper & Bulk Tanker Logistics', desc: 'Bulk Supply' }
        ],
        specsPl: [
            { bold: 'Kruszywa o Uziarnieniu Kontrolowanym', desc: '0–31.5mm / 0–63mm' },
            { bold: 'Materiały Zgodne z REACH i Obojętne Chemicznie', desc: 'Certyfikat ECO' },
            { bold: 'Transport Wagonami Węglarkami i Wywrotkami', desc: 'Dostawy Hurtowe' }
        ],
        buttonEn: 'Inquire Aggregate Specs',
        buttonPl: 'Zapytaj o Specyfikację Kruszyw',
        image: 'https://unsplash.com/photos/ZLzkwU49BdY/download?w=1200',
        alt: 'Large piece of molten metal being poured onto a machine'
    }
];

const Services = () => {
    const { i18n } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const isPl = (i18n.language || 'en').startsWith('pl');

    const activeService = servicesData[activeIndex];
    const specs = isPl ? activeService.specsPl : activeService.specsEn;
    const eyebrow = isPl ? activeService.eyebrowPl : activeService.eyebrowEn;
    const title = isPl ? activeService.titlePl : activeService.titleEn;
    const subtitle = isPl ? activeService.subtitlePl : activeService.subtitleEn;
    const buttonText = isPl ? activeService.buttonPl : activeService.buttonEn;

    return (
        <section id="services" className="bg-white text-main py-12 sm:py-16 lg:py-24 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6 sm:space-y-8">

                {/* Single-Line Horizontal Scrollable Tabs on Mobile (< lg), Grid on Desktop (lg:) */}
                <div className="border-b border-gray-200 pb-2 lg:pb-0">
                    <div role="tablist" aria-label="Services Navigation" className="flex overflow-x-auto scroll-smooth whitespace-nowrap gap-2 pr-6 lg:pr-0 no-scrollbar lg:grid lg:grid-cols-6 lg:gap-2 lg:overflow-visible">
                        {servicesData.map((service, idx) => {
                            const label = isPl ? service.labelPl : service.labelEn;
                            const isSelected = activeIndex === idx;
                            return (
                                <button
                                    key={service.key}
                                    id={`service-tab-${service.key}`}
                                    role="tab"
                                    aria-selected={isSelected}
                                    aria-controls={`service-panel-${service.key}`}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`px-3.5 py-2.5 min-h-[44px] inline-flex items-center justify-center text-xs sm:text-sm font-headers uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer text-center border-b-2 rounded-none shrink-0 focus-visible:ring-2 focus-visible:ring-main focus-visible:outline-none ${
                                        isSelected
                                            ? 'text-main border-main bg-gray-50/80 font-bold'
                                            : 'text-gray-500 hover:text-gray-900 border-transparent hover:bg-gray-50/40'
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Split Container: Stacked on Mobile, 50/50 Side-by-Side on Desktop */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeService.key}
                        id={`service-panel-${activeService.key}`}
                        role="tabpanel"
                        aria-labelledby={`service-tab-${activeService.key}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="group grid grid-cols-1 lg:grid-cols-2 items-stretch border border-slate-200 rounded-none shadow-sm bg-white min-h-[480px]"
                    >
                        {/* Content Column */}
                        <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-between h-full space-y-6 lg:space-y-8 lg:border-r border-slate-200">
                            <div>
                                <div className="text-[11px] font-headers font-bold uppercase tracking-widest text-slate-600 mb-1.5 sm:mb-2">
                                    {eyebrow}
                                </div>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-headers font-extrabold tracking-[-0.03em] text-slate-950 leading-[1.12] mb-3 sm:mb-4">
                                    {title}
                                </h3>

                                {/* Responsive Image Positioned Below Title on Mobile (< lg) */}
                                <div className="lg:hidden relative w-full h-48 sm:h-64 overflow-hidden bg-slate-950 my-4 rounded-none border border-slate-200">
                                    <img
                                        src={activeService.image}
                                        alt={activeService.alt}
                                        className="absolute inset-0 w-full h-full object-cover filter contrast-[1.08] brightness-[0.92] saturate-[0.95]"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                </div>

                                <p className="text-sm sm:text-base font-regular text-slate-600 leading-relaxed max-w-lg mb-6">
                                    {subtitle}
                                </p>

                                {/* Capability Spec Rows */}
                                <div className="border-t border-slate-200 divide-y divide-slate-100 pt-2">
                                    <div className="text-xs font-headers font-bold uppercase tracking-wider text-slate-900 py-2.5 sm:py-3">
                                        {isPl ? 'ZAKRES USŁUG I SPECYFIKACJA' : 'KEY CAPABILITIES & SPECIFICATIONS'}
                                    </div>
                                    {specs.map((item, idx) => (
                                        <div key={idx} className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <span className="text-xs font-headers font-bold uppercase tracking-wider text-slate-900">
                                                {item.bold}
                                            </span>
                                            {item.desc && (
                                                <span className="text-xs sm:text-sm font-regular text-slate-600">
                                                    {item.desc}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Action Button */}
                            <div className="pt-4">
                                <a
                                    href="#contact"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 min-h-[44px] bg-slate-950 hover:bg-slate-800 text-white font-headers font-semibold text-xs uppercase tracking-wider transition-all duration-200 rounded-none shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
                                >
                                    {buttonText}
                                </a>
                            </div>
                        </div>

                        {/* Desktop Image Display (Hidden on Mobile, Visible on Desktop) */}
                        <div className="hidden lg:block relative min-h-[520px] w-full h-full overflow-hidden bg-slate-950">
                            {servicesData.map((service, idx) => {
                                const isActive = activeIndex === idx;
                                return (
                                    <img
                                        key={service.key}
                                        src={service.image}
                                        alt={service.alt}
                                        loading="eager"
                                        decoding="async"
                                        fetchPriority={idx === 0 ? "high" : "auto"}
                                        className={`absolute inset-0 w-full h-full object-cover filter contrast-[1.08] brightness-[0.92] saturate-[0.95] transition-all duration-500 ease-out group-hover:scale-105 ${
                                            isActive
                                                ? 'opacity-100 z-10'
                                                : 'opacity-0 pointer-events-none z-0'
                                        }`}
                                    />
                                );
                            })}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Services;
