"use client";

import { Button } from "@/components/button";
import { InputRichText } from "@/components/richText/InputRichText";
import { RichText } from "@/components/richText/RichText";
import React from "react";

interface ResearchContentProps {}

const baseContent = [
	'{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Abstract"},{"type":"text","text":": Endometriosis is a prevalent chronic inflammatory disease characterized by a considerable delay"}]},{"type":"paragraph","content":[{"type":"text","text":"between initial symptoms and diagnosis through surgery. The pressing need for a timely, non-invasive"}]},{"type":"paragraph","content":[{"type":"text","text":"diagnostic solution underscores the focus of current research efforts. This study examines the diagnostic"}]},{"type":"paragraph","content":[{"type":"text","text":"potential of the menstrual blood lipidome. The lipid profile of 39 samples (23 women with endometriosis and"}]},{"type":"paragraph","content":[{"type":"text","text":"16 patient of control group) was acquired using reverse-phase high-performance liquid chromatography-mass"}]},{"type":"paragraph","content":[{"type":"text","text":"spectrometry with LipidMatch processing and identification. Profiles were normalized based on total ion"}]},{"type":"paragraph","content":[{"type":"text","text":"counts. Significant differences in lipids were determined using the Mann-Whitney test. Lipids for the"}]},{"type":"paragraph","content":[{"type":"text","text":"diagnostic model, based on logistic regression, were selected using a combination of variance importance"}]},{"type":"paragraph","content":[{"type":"text","text":"projection filters and Akaike information criteria. Levels of ceramides, sphingomyelins, cardiolipins,"}]},{"type":"paragraph","content":[{"type":"text","text":"triacylglycerols, acyl- and alkenyl-phosphatidylethanolamines, and alkenyl-phosphatidylcholines increased,"}]},{"type":"paragraph","content":[{"type":"text","text":"while acyl- and alkyl-phosphatidylcholines decreased in cases of endometriosis. PE P-16:0/18:1 and CL"}]},{"type":"paragraph","content":[{"type":"text","text":"16:0_18:0_22:5_22:6 serve as marker lipids in the diagnostic model, exhibiting a sensitivity of 81% and"}]},{"type":"paragraph","content":[{"type":"text","text":"specificity of 85%. The diagnostic approach based on dried spots of menstrual blood holds promise as an"}]},{"type":"paragraph","content":[{"type":"text","text":"alternative to traditional non-invasive methods for endometriosis screening."}]}]}',
];

export function ResearchContent({}: ResearchContentProps) {
	const [descriptions, setDescriptions] = React.useState<string[]>(baseContent);
	const [isEditing, setIsEditing] = React.useState(false);
	return (
		<div className="py-10">
			<div className="flex justify-end">
				<Button variant="black" size="small" onClick={() => setIsEditing(true)}>
					Edit
				</Button>
			</div>
			{isEditing ? (
				<>
					<InputRichText
						minRows={4}
						label="description"
						value={descriptions[0]}
						onChange={(description) => setDescriptions([description])}
					/>
					<div className="mt-4 flex items-center space-x-4 justify-end">
						<div
							className="text-gray-500 text-xs cursor-pointer hover:text-gray-700"
							onClick={() => setIsEditing(false)}
						>
							Cancel
						</div>
						<Button variant="primary" onClick={() => setIsEditing(false)}>
							Save
						</Button>
					</div>
				</>
			) : (
				<div className=" border-b border-gray-100 leading-relaxed text-sm">
					<RichText value={descriptions[0]} />
				</div>
			)}
		</div>
	);
}
