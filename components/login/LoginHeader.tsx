import { View, useWindowDimensions } from "react-native";
import Svg, {
  Defs,
  ClipPath,
  Image as SvgImage,
  Polygon,
} from "react-native-svg";
import { useState } from "react";

export default function LoginHeader() {
  const { width } = useWindowDimensions();
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  return (
    <View className="h-96 w-full relative">
      {/* LÍNEA BLANCA (ENCIMA DE TODO) */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: -width * 0.6,
          bottom: 90,
          width: width * 2.6,
          height: 5,
          backgroundColor: "#FFFFFF",
          transform: [{ rotate: "-20deg" }],
          zIndex: 9999,
        }}
      />
      <Svg
        pointerEvents="none"
        style={{
          position: "absolute",
          left: -width * 1.5,
          bottom: -170,
          width: width * 2.8,
          height: 120,
          zIndex: 9999,
          transform: [{ rotate: "-20deg" }],
        }}
        viewBox="0 0 1000 200"
      >
        <Polygon
          points="
              0,0
              1000,0
              1000,0
              0,200
             "
          fill="#FFFFFF"
        />
      </Svg>
      <Svg
        pointerEvents="none"
        style={{
          position: "absolute",
          right: 0, // 👈 pegado al lado derecho
          bottom: -180,
          width: 160, // ancho de la cuña
          height: 260, // largo vertical
          zIndex: 9999,
        }}
        viewBox="0 0 100 200"
      >
        <Polygon
              points="
          130,200     
          30,0   
          30,0    
          130,90      
        "
          fill="#FFFFFF"
        />
      </Svg>
      {/* CONTENEDOR QUE SÍ PUEDE CORTAR */}
      <View className="absolute inset-0 overflow-hidden">
        <View
          className="w-full h-full"
          onLayout={(e) =>
            setLayout({
              width: e.nativeEvent.layout.width,
              height: e.nativeEvent.layout.height,
            })
          }
        >
          {layout.width > 0 && layout.height > 0 && (
            <Svg
              width={layout.width}
              height={layout.height}
              viewBox={`0 0 ${layout.width} ${layout.height}`}
            >
              <Defs>
                <ClipPath id="clip">
                  {(() => {
                    const angle = (32 * Math.PI) / 180;
                    const cut = Math.tan(angle) * layout.width;

                    const rightOffsetFactor = 0.3;
                    const rightOffset = layout.height * rightOffsetFactor;

                    const CUT_PUSH = 0.01;

                    const yRight = Math.min(
                      layout.height,
                      Math.max(
                        0,
                        layout.height -
                          cut +
                          rightOffset +
                          layout.height * CUT_PUSH
                      )
                    );

                    const yLeft = Math.min(
                      layout.height,
                      Math.max(0, layout.height + layout.height * CUT_PUSH)
                    );

                    return (
                      <Polygon
                        points={`
                          0,0
                          ${layout.width},0
                          ${layout.width},${yRight}
                          0,${yLeft}
                        `}
                      />
                    );
                  })()}
                </ClipPath>
              </Defs>

              <SvgImage
                href={{
                  uri: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",
                }}
                x={-layout.width * 0.2}
                y={-layout.height * 0.1}
                width={layout.width * 1.4}
                height={layout.height * 1.2}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip)"
              />
            </Svg>
          )}
        </View>
      </View>
    </View>
  );
}
