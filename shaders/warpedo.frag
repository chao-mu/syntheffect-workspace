#pragma include "../include/module.glsl"

// @name Warpedo
// @desc Warp the inputs
// @author Danimalia Hackpoetica

DEFINE_INPUT(in1, 0., DESC("input channel 1"))
DEFINE_INPUT(in2, 0., DESC("input channel 2"))
DEFINE_INPUT(in3, 0., DESC("input channel 3"))
DEFINE_INPUT(amountX, 1., DESC("amount of indent"));
DEFINE_INPUT(xNegative, 0., DESC("make amountX negative"));
DEFINE_INPUT(amountY, 1., DESC("amount of indent"));
DEFINE_INPUT(yNegative, 0., DESC("make amountY negative"));
DEFINE_INPUT_GROUP(ins, in1, in2, in3)

DEFINE_OUTPUT_1(out1, DESC("output channel for in1"))
DEFINE_OUTPUT_2(out2, DESC("output channel for in2"))
DEFINE_OUTPUT_3(out3, DESC("output channel for in3"))

DEFINE_OUTPUT_GROUP(outs, out1, out2, out3)

// Inspried by https://www.geeks3d.com/20140213/glsl-shader-library-fish-eye-and-dome-and-barrel-distortion-post-processing-filters/
void main() {
    vec2 uv = get_uv_1to1();
    vec2 polar = get_uv_polar();

    float x = input_amountX();
    if (is_true(input_xNegative())) {
        x *= -1;
    }

    float y = input_amountY();
    if (is_true(input_yNegative())) {
        y *= -1;
    }

    uv.x *= mix(1, SQRT_2 - polar.x, x);
    uv.y *= mix(1, SQRT_2 - polar.x, y);

    output_outs(input_ins(from_uv_1to1(uv)));
}
