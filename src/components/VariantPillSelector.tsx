"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface VariantOption {
	id: number;
	name: string;
	value: string;
}

interface VariantPillSelectorProps {
	options: VariantOption[];
	onSelect: (option: VariantOption) => void;
	selectedId?: number;
	label?: string;
}

const VariantPillSelector = ({
	options,
	onSelect,
	selectedId,
	label = "Select Option",
}: VariantPillSelectorProps) => {
	const [selected, setSelected] = useState<number | undefined>(selectedId);

	const handleSelect = (option: VariantOption) => {
		setSelected(option.id);
		onSelect(option);
	};

	return (
		<div className="space-y-3">
			{label && <p className="text-sm font-medium text-gray-700">{label}</p>}
			<div className="flex flex-wrap gap-2">
				{options.map((option) => {
					const isSelected = selected === option.id;
					return (
						<motion.button
							key={option.id}
							type="button"
							onClick={() => handleSelect(option)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`px-4 py-2 rounded-full border-2 font-medium transition-all ${
								isSelected
									? "border-blue-600 bg-blue-600 text-white shadow-md"
									: "border-gray-300 bg-white text-gray-700 hover:border-blue-400"
							}`}
						>
							{option.value}
						</motion.button>
					);
				})}
			</div>
		</div>
	);
};

export default VariantPillSelector;
