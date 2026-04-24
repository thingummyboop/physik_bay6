from manim import *

class VektorAddition(Scene):
    def construct(self):
        self.camera.frame_width = 26
        self.camera.frame_height = 26 * 9 / 16
        title = Text("Addition von Kräften (Vektoren)").to_edge(UP)
        self.play(Write(title))

        obj = Dot(ORIGIN, color=WHITE, radius=0.2).shift(LEFT*2 + DOWN*1)
        obj_label = Text("Objekt", font_size=28).next_to(obj, DOWN, buff=0.5)
        self.play(FadeIn(obj), Write(obj_label))

        f1 = Arrow(start=obj.get_center(), end=obj.get_center() + RIGHT * 4, color=BLUE, buff=0)
        f1_label = Text("F1", color=BLUE, font_size=28).next_to(f1, DOWN, buff=0.2)
        
        f2 = Arrow(start=obj.get_center(), end=obj.get_center() + UP * 3 + RIGHT * 1.5, color=GREEN, buff=0)
        f2_label = Text("F2", color=GREEN, font_size=28).next_to(f2, LEFT, buff=0.2)

        self.play(GrowArrow(f1), Write(f1_label))
        self.play(GrowArrow(f2), Write(f2_label))
        self.wait(1)

        f1_copy = f1.copy().set_opacity(0.3)
        f2_copy = f2.copy().set_opacity(0.3)

        self.play(
            f1_copy.animate.shift(UP * 3 + RIGHT * 1.5),
            f2_copy.animate.shift(RIGHT * 4)
        )
        self.wait(1)

        f_res = Arrow(start=obj.get_center(), end=obj.get_center() + RIGHT * 5.5 + UP * 3, color=RED, buff=0)
        f_res_label = Text("F_res", color=RED, font_size=32).next_to(f_res.get_end(), UP, buff=0.3)

        self.play(GrowArrow(f_res), Write(f_res_label))
        
        formula = Text("F_res = F1 + F2", font_size=32).to_corner(DR)
        self.play(Write(formula))

        self.wait(3)