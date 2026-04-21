export const AnimationDurationMs = 500;
import '@vertexvis/viewer';

export async function flyTo({ camera, viewer }) {
	if (viewer == null || camera == null) return;

	const scene = await viewer.scene();
	if (scene == null) return;

	const sc = scene.camera();
	if (
		JSON.stringify({
			position: sc.position,
			lookAt: sc.lookAt,
			up: sc.up,
		}) === JSON.stringify(camera)
	) {
		return;
	}

	return scene
		.camera()
		.flyTo({ camera })
		.render({ animation: { milliseconds: AnimationDurationMs } });
}

export async function handleHit({ detail, hit, viewer }) {
	if (!viewer) return;

	const scene = await viewer.scene();
	if (scene == null) return;

	const id = hit?.itemId?.hex;
	if (detail.buttons === 1) {
		if (id) {
			await scene
				.items((op) => {
					const idQuery = op.where((q) => q.withItemId(id));
					return [op.where((q) => q.all()).deselect(), idQuery.select()];
				})
				.execute();
		} else {
			await scene.items((op) => op.where((q) => q.all()).deselect()).execute();
		}
	}
}

export async function selectBySuppliedIds({ ids, viewer }) {
	if (viewer == null || !ids || ids.length === 0) return;

	const scene = await viewer.scene();
	if (scene == null) return;

	await scene
		.items((op) => {
			return [
				op.where((q) => q.all()).deselect(),
				op.where((q) => q.withSuppliedIds(ids)).select(),
			];
		})
		.execute();
}
