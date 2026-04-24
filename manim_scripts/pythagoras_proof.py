from manim import *

class PythagorasBeweis(Scene):
    def construct(self):
        self.camera.frame_width = 26
        self.camera.frame_height = 26 * 9 / 16
        
        title = Text("Satz des Pythagoras: a² + b² = c²").to_edge(UP)
        self.play(Write(title))

        # We scale the entire geometry down and shift it up/left to leave room for text
        geo_group = VGroup()

        t = Polygon(ORIGIN, RIGHT*4, RIGHT*4+UP*3, color=WHITE).shift(LEFT*2 + DOWN*1.5)
        
        sq_a = Square(side_length=3, fill_color=BLUE, fill_opacity=0.5, stroke_color=BLUE).next_to(t, RIGHT, buff=0)
        sq_b = Square(side_length=4, fill_color=GREEN, fill_opacity=0.5, stroke_color=GREEN).next_to(t, DOWN, buff=0)
        
        sq_c = Square(side_length=5, fill_color=RED, fill_opacity=0.5, stroke_color=RED)
        sq_c.rotate(np.arctan2(3, 4))
        sq_c.move_to(LEFT*1.5 + UP*2)

        a_text = Text("a = 3", color=BLUE, font_size=32).next_to(sq_a, RIGHT, buff=0.5)
        b_text = Text("b = 4", color=GREEN, font_size=32).next_to(sq_b, DOWN, buff=0.5)
        c_text = Text("c = 5", color=RED, font_size=32).next_to(sq_c, UL, buff=0.5)

        geo_group.add(t, sq_a, sq_b, sq_c, a_text, b_text, c_text)
        
        # Center and scale the geometry
        geo_group.scale(0.8).move_to(LEFT * 2 + DOWN * 0.5)

        # Now animate
        self.play(Create(t))
        self.play(FadeIn(sq_a), Write(a_text))
        self.play(FadeIn(sq_b), Write(b_text))
        self.wait(1)

        # Equations on the right side
        eq = Text("3² + 4² = 9 + 16 = 25", font_size=36).move_to(RIGHT * 5 + DOWN * 1)
        self.play(Write(eq))
        self.wait(1)

        self.play(FadeIn(sq_c), Write(c_text))
        eq2 = Text("5² = 25", color=RED, font_size=36).next_to(eq, UP, buff=1)
        self.play(Write(eq2))
        
        eq3 = Text("Die Flächen sind\ngleich groß!", color=YELLOW, font_size=36, justify="center").next_to(eq2, UP, buff=1)
        self.play(Write(eq3))
        self.wait(3)