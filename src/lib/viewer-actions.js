import { AnimationDurationMs } from '../components/Viewer';

export async function fitAll(
	viewer,
	animationDurationMs = AnimationDurationMs,
) {
	const scene = await viewer.current?.scene();
	await scene
		?.camera()
		.viewAll()
		.render({ animation: { milliseconds: animationDurationMs } });
}

export async function resetScene(viewer) {
	const scene = await viewer.current?.scene();
	await scene?.reset({ includeCamera: true });
}

export async function clearPhantomFromAllSceneItems(viewer) {
	const scene = await viewer.current?.scene();

	await scene?.items((op) => op.where((q) => q.all()).clearPhantom()).execute();
}

export async function setPhantomForSceneItems(viewer, sceneItems) {
	const scene = await viewer.current?.scene();

	await scene
		?.items((op) => [
			op.where((q) => q.all()).setPhantom(),
			op.where((q) => q.withSuppliedIds(sceneItems)).clearPhantom(),
		])
		.execute();
}
