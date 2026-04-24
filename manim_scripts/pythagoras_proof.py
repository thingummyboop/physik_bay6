from manim import *

class PythagorasBeweis(Scene):
    def construct(self):
        self.camera.frame_width = 22
        title = Text("Satz des Pythagoras: a² + b² = c²").to_edge(UP)
        self.play(Write(title))

        t = Polygon(ORIGIN, RIGHT*4, RIGHT*4+UP*3, color=WHITE)
        a_text = Text("a = 3", color=BLUE).next_to(t, RIGHT)
        b_text = Text("b = 4", color=GREEN).next_to(t, DOWN)
        c_text = Text("c = 5", color=RED).move_to(RIGHT*1.5 + UP*2).rotate(np.arctan(3/4))

        self.play(Create(t), Write(a_text), Write(b_text), Write(c_text))

        sq_a = Square(side_length=3, fill_color=BLUE, fill_opacity=0.5, stroke_color=BLUE).move_to(RIGHT*5.5 + UP*1.5)
        sq_b = Square(side_length=4, fill_color=GREEN, fill_opacity=0.5, stroke_color=GREEN).move_to(RIGHT*2 + DOWN*2)
        sq_c = Square(side_length=5, fill_color=RED, fill_opacity=0.5, stroke_color=RED).move_to(LEFT*3 + UP*0.5)

        self.play(FadeIn(sq_a), FadeIn(sq_b))
        self.wait(1)

        eq = Text("3² + 4² = 9 + 16 = 25", font_size=36).move_to(DOWN*3)
        self.play(Write(eq))
        self.wait(1)

        self.play(FadeIn(sq_c))
        eq2 = Text("5² = 25", color=RED, font_size=36).next_to(eq, UP)
        self.play(Write(eq2))
        
        eq3 = Text("Die Flächen sind gleich groß!", color=YELLOW, font_size=36).next_to(sq_c, UP)
        self.play(Write(eq3))
        self.wait(3)