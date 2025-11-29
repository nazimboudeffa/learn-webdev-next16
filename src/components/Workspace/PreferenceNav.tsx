import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { ISettings } from "./Playground";

type PreferenceNavProps = {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);

	return (
		<div className='flex items-center justify-between h-12 w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'>
			<div className='flex items-center pt-2'>
				<div className={"rounded-t-lg px-4 sm:px-6 py-2.5 text-sm font-semibold cursor-pointer bg-white/95 dark:bg-slate-800/95 text-indigo-700 dark:text-indigo-300 shadow-md"}>
					💻 Code
				</div>
			</div>

			<div className='flex items-center mr-3 sm:mr-5 space-x-2 sm:space-x-3'>
				<button
					className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all group shadow-md hover:shadow-lg'
					onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
				>
					<div className='h-5 w-5 font-bold text-lg sm:text-xl text-white group-hover:rotate-90 transition-transform duration-300'>
						<AiOutlineSetting />
					</div>
				</button>

				<button className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all group shadow-md hover:shadow-lg' onClick={handleFullScreen}>
					<div className='h-5 w-5 font-bold text-lg sm:text-xl text-white group-hover:scale-110 transition-transform'>
						{isFullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
					</div>
				</button>
			</div>
		</div>
	);
};
export default PreferenceNav;
