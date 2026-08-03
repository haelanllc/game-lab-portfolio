#!/bin/sh
set -eu

if [ "$#" -ne 2 ]; then
  echo "Usage: scripts/prepare-wildling-sprite.sh keyed-source.png final-sprite.png" >&2
  exit 2
fi

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
python_bin="$project_dir/.venv/bin/python"
helper_path="${CODEX_HOME:-$HOME/.codex}/skills/.system/imagegen/scripts/remove_chroma_key.py"

if [ ! -x "$python_bin" ]; then
  echo "Bootstrap first: uv venv .venv && uv pip install --python .venv/bin/python -r requirements-imagegen.txt" >&2
  exit 1
fi

work_dir=$(mktemp -d /tmp/wildling-sprite.XXXXXX)
cleanup_sprite(){ find "$work_dir" -mindepth 1 -delete; rmdir "$work_dir"; }
trap cleanup_sprite EXIT

mkdir -p "$(dirname -- "$2")"
"$python_bin" "$helper_path" \
  --input "$1" \
  --out "$work_dir/alpha.png" \
  --auto-key border \
  --soft-matte \
  --transparent-threshold 12 \
  --opaque-threshold 220 \
  --despill \
  --force
sips -Z 360 "$work_dir/alpha.png" --out "$2" >/dev/null
echo "Prepared $2"
