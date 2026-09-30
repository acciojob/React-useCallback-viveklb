import React, { memo, useCallback, useState } from "react";
import "../styles/App.css";

export const SkillList = memo(function SkillList({ skills, onDeleteSkill }) {
	return (
		<ul>
			{skills.map((skill, index) => (
				<li
					id={`skill-number-${index}`}
					key={skill}
					onClick={() => onDeleteSkill(skill)}
					onKeyDown={(event) => {
						if (event.key === "Enter" || event.key === " ") {
							event.preventDefault();
							onDeleteSkill(skill);
						}
					}}
					role="button"
					tabIndex={0}
				>
					{skill}
				</li>
			))}
		</ul>
	);
});

export function UseCallbackComp() {
	const [skills, setSkills] = useState(["HTML", "CSS", "JavaScript", "React"]);
	const [newSkill, setNewSkill] = useState("");

	const handleDeleteSkill = useCallback((skillToDelete) => {
		setSkills((currentSkills) =>
			currentSkills.filter((skill) => skill !== skillToDelete)
		);
	}, []);

	const handleInputChange = useCallback((event) => {
		setNewSkill(event.target.value);
	}, []);

	const handleAddSkill = useCallback(
		(event) => {
			event.preventDefault();
			const skill = newSkill.trim();

			if (!skill) return;

			setSkills((currentSkills) =>
				currentSkills.some(
					(currentSkill) => currentSkill.toLowerCase() === skill.toLowerCase()
				)
					? currentSkills
					: [...currentSkills, skill]
			);
			setNewSkill("");
		},
		[newSkill]
	);

	return (
		<main>
			<h1 id="heading">Skills</h1>
			<form onSubmit={handleAddSkill}>
				<input
					id="skill-input"
					onChange={handleInputChange}
					value={newSkill}
					aria-label="Skill"
				/>
				<button id="skill-add-btn" type="submit">
					Add Skill
				</button>
			</form>
			<SkillList skills={skills} onDeleteSkill={handleDeleteSkill} />
		</main>
	);
}

export default UseCallbackComp;

