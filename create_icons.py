#!/usr/bin/env python3
"""
간단한 런처 아이콘 생성 스크립트 (PIL 없이)
"""
import struct
import zlib
import os

def create_png(width, height, color_r, color_g, color_b):
    """간단한 단색 PNG 이미지 생성"""
    # PNG 시그니처
    png_signature = b'\x89PNG\r\n\x1a\n'

    # IHDR 청크
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data) & 0xffffffff
    ihdr_chunk = struct.pack('>I', 13) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)

    # IDAT 청크 (이미지 데이터)
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # 필터 타입
        for x in range(width):
            # 중앙에 'C' 문자 표시 (간단한 패턴)
            if is_letter_c(x, y, width, height):
                raw_data += bytes([color_r, color_g, color_b])
            else:
                raw_data += bytes([52, 152, 219])  # 배경색 (파란색)

    compressed_data = zlib.compress(raw_data, 9)
    idat_crc = zlib.crc32(b'IDAT' + compressed_data) & 0xffffffff
    idat_chunk = struct.pack('>I', len(compressed_data)) + b'IDAT' + compressed_data + struct.pack('>I', idat_crc)

    # IEND 청크
    iend_crc = zlib.crc32(b'IEND') & 0xffffffff
    iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)

    return png_signature + ihdr_chunk + idat_chunk + iend_chunk

def is_letter_c(x, y, width, height):
    """'C' 문자 형태 판단 (간단한 패턴)"""
    cx, cy = width // 2, height // 2
    dx, dy = x - cx, y - cy

    # 원 형태
    radius_outer = min(width, height) // 3
    radius_inner = radius_outer - max(width, height) // 10
    dist_sq = dx * dx + dy * dy

    # 'C' 모양: 오른쪽이 열린 원
    if radius_inner * radius_inner < dist_sq < radius_outer * radius_outer:
        if dx < radius_outer // 3:  # 왼쪽과 위아래만 표시
            return True

    return False

# 다양한 크기의 아이콘 생성
icon_sizes = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192,
}

base_path = 'android/app/src/main/res'

for folder, size in icon_sizes.items():
    folder_path = os.path.join(base_path, folder)
    os.makedirs(folder_path, exist_ok=True)

    # ic_launcher.png
    png_data = create_png(size, size, 255, 255, 255)  # 흰색 'C'
    with open(os.path.join(folder_path, 'ic_launcher.png'), 'wb') as f:
        f.write(png_data)

    # ic_launcher_round.png (동일)
    with open(os.path.join(folder_path, 'ic_launcher_round.png'), 'wb') as f:
        f.write(png_data)

    # ic_launcher_foreground.png
    with open(os.path.join(folder_path, 'ic_launcher_foreground.png'), 'wb') as f:
        f.write(png_data)

    print(f'Created icons for {folder} ({size}x{size})')

print('All launcher icons created successfully!')
