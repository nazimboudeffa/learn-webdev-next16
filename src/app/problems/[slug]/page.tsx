'use client'

import { use } from "react";
import Workspace from "@/components/Workspace/Workspace";
import useHasMounted from "@/hooks/useHasMounted";
import { ProblemElement } from "@/problems/types/problem";
import { problems } from "@/problems/list";
import Navbar from "@/components/Navbar";

const ProblemPage: React.FC = (context : any) => {
	const hasMounted = useHasMounted();
	if (!hasMounted) return null;
	const params: { slug: string } = use(context.params);
	const getData = (slug: string) : ProblemElement => {
		const problem = problems[slug];
		return problem;
	}
	const problem = getData(params.slug)
	return (
		<>		
			<Navbar />
			<Workspace problem={problem} />
		</>
	);

};

export default ProblemPage;