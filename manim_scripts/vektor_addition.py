from manim import *

class VektorAddition(Scene):
    def construct(self):
        title = Text("Addition von Kräften (Vektoren)").to_edge(UP)
        self.play(Write(title))

        # Origin point (an object being pulled)
        obj = Dot(ORIGIN, color=WHITE, radius=0.2)
        obj_label = Text("Objekt", font_size=20).next_to(obj, DOWN)
        self.play(FadeIn(obj), Write(obj_label))

        # Force 1
        f1 = Arrow(start=ORIGIN, end=RIGHT * 3, color=BLUE, buff=0)
        f1_label = MathTex(r"\vec{F}_1", color=BLUE).next_to(f1, DOWN)
        
        # Force 2
        f2 = Arrow(start=ORIGIN, end=UP * 2 + RIGHT * 1, color=GREEN, buff=0)
        f2_label = MathTex(r"\vec{F}_2", color=GREEN).next_to(f2, LEFT)

        self.play(GrowArrow(f1), Write(f1_label))
        self.play(GrowArrow(f2), Write(f2_label))
        self.wait(1)

        # Parallelogram method
        f1_copy = f1.copy().set_opacity(0.3)
        f2_copy = f2.copy().set_opacity(0.3)

        self.play(
            f1_copy.animate.shift(UP * 2 + RIGHT * 1),
            f2_copy.animate.shift(RIGHT * 3)
        )
        self.wait(1)

        # Resulting force
        f_res = Arrow(start=ORIGIN, end=RIGHT * 4 + UP * 2, color=RED, buff=0)
        f_res_label = MathTex(r"\vec{F}_{res}", color=RED).next_to(f_res.get_end(), UP)

        self.play(GrowArrow(f_res), Write(f_res_label))
        
        # Box showing formula
        formula = MathTex(r"\vec{F}_{res} = \vec{F}_1 + \vec{F}_2").to_corner(DR)
        self.play(Write(formula))

        self.wait(3)
