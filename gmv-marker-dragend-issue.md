## Describe the bug

In the Vue 3 package, `GmvMarker` appears to declare support for a `dragend` event, but `@dragend` does not fire from `packages/v3/src/components/marker-icon.vue`. The marker does still emit `@update:position` when dragging ends.

From tracing the implementation, the likely cause is that `dragend` is not included in the marker's auto-bound event list, even though it is declared as an emitted event and manually handled for `update:position`.

```typescript
    auto: ['click', 'drag', 'dragstart', 'gmp-click'],
```

## To reproduce

Steps to reproduce the behavior:

1. Install the Vue 3 version of `gmap-vue`
2. Render a draggable marker using `GmvMarker`
3. Attach both `@dragend` and `@update:position` listeners
4. Drag the marker and release it
5. Observe that `@update:position` fires, but `@dragend` does not

Example:

```vue
<GmvMap ...>
  <GmvMarker
    :position="{ lat: 40.0, lng: -74.0 }"
    :gmp-draggable="true"
    @dragend="onDragEnd"
    @update:position="onPositionUpdate"
  />
</GmvMap>
```

## Expected behavior

`GmvMarker` should emit `dragend` as a Vue event when marker dragging ends, so that `@dragend` works consistently with other drag lifecycle events such as `@drag` and `@dragstart`.

## Current behavior

`@dragend` does not fire for `GmvMarker`, but `@update:position` does fire on drag end.

After reviewing the implementation:

- `GmvMarker` event config puts `dragend` under `manual`, not `auto`
- `marker-icon.vue` binds only the `auto` event list
- `marker-icon.vue` manually listens for native `dragend`, but only emits `update:position`
- `dragend` is declared in `defineEmits`, but it is never actually emitted

## Screenshots

If applicable, add screenshots to help explain your problem.

## Desktop (please complete the following information)

- OS: [e.g. macOS / Windows / Linux]
- Browser [e.g. Chrome, Safari, Firefox]
- Version [e.g. 125]

## Smartphone (please complete the following information)

- Device: [e.g. iPhone 15]
- OS: [e.g. iOS 18]
- Browser [e.g. Safari]
- Version [e.g. 18]

## Additional context

I traced the v3 implementation and found what looks like a config/implementation mismatch specific to `GmvMarker`.

In `packages/v3/src/composables/plugin-component-config.ts`, `GmvMarker` defines:

- `auto: ['click', 'drag', 'dragstart', 'gmp-click']`
- `manual: ['dragend', 'update:position']`

In `packages/v3/src/components/marker-icon.vue`, the component calls `getComponentEventsConfig('GmvMarker', 'auto')`, so only the auto events are forwarded as Vue events.

A native `marker.addListener('dragend', ...)` is present, but it only emits `update:position`, not `dragend`.

This suggests one of the following fixes:

1. Move `dragend` into the `auto` list for `GmvMarker`
2. Keep it manual, but explicitly emit `dragend` inside the native `dragend` listener in `marker-icon.vue`

## Versions

- Node:
- NPM:
- Yarn:
- PNPM:
- Deno:

## Package manager

- [ ] NPM
- [ ] Yarn
- [ ] PNPM

## Plugin version

- version:
